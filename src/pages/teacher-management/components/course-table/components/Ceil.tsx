import styles from "../index.module.less";
import { useFormModal } from "~/hooks/modal/FormModal";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { message, Modal, Popover } from "antd";
import Notify from "~/components/notify";
import { useState, useEffect } from "react";
import classNames from "classnames";
import { Dropdown } from "antd";
import { StudentType } from "~/client/salary";
import { editCourseTable, deleteCourseTable } from "~/client/coursetable";
import root from "~/store/root";
import { CourseInfo } from "./CourseInfo";
import dayjs from "dayjs";
import { getColorData } from "~/utils";

interface CeilType {
  handleData?: (data: any) => void;
  flex?: string;
  studentList: StudentType[];
  refresh?: () => void;
  data: {
    id: string;
    name?: string; //课程名称
    status?: string; // 课程状态
    student_name?: string;
    teacher_name?: string;
    teacher_id?: string;
    student_id?: string;
    time?: string;
    date?: string;
    start_time?: string;
    end_time?: string;
  };
  style?: Object;
  currentCeil: { id?: string; isShowMenu?: boolean };
}

export const Ceil: React.FC<CeilType> = (props) => {
  const { t } = useTranslation();
  const isOrgadm = root.userinfo.role == "orgadm";
  const content = props.data;
  const colorMap = getColorData(t);
  const items: any = colorMap;
  const currentColorInfo = colorMap.find(
    (item: { key: string | undefined }) => item.key == content.status
  );
  const { studentList, style } = props;
  const { currentCeil } = props;
  const [modal, contextHolder] = Modal.useModal();
  const [isMenu, setIsMenu] = useState<boolean | undefined>(false);
  const [isShowPopover, setShowPopover] = useState<boolean | undefined>(false);
  const confirm = () => {
    modal.confirm({
      title: t("delete"),
      icon: <ExclamationCircleOutlined />,
      content: t("are you sure delete {{name}}？", { name: content.name }),
      okText: t("confirm"),
      cancelText: t("cancel"),
      onOk: () => onOk(),
    });
  };
  const onOk = () => {
    return deleteCourseTable({ id: content.id }).then(() => {
      Notify.success(t("success"), t("{{name}} success", { name: t("delete") }));
      props.refresh && props.refresh();
    });
  };
  // 单击
  const handleClick = () => {
    if (!isOrgadm) {
      return;
    }
    // 取消右键列表
    props.handleData && props.handleData({ id: "", isShowMenu: false });
    // 打开弹框
    toggle(true);
  };
  const handleSelect = ({ key }: any) => {
    //关闭右键列表
    setIsMenu(false);
    // 删除课程
    if (key == "8") {
      confirm();
      return;
    }
    // 编辑课程
    editCourseTable({
      id,
      date: content.date,
      student_id: content.student_id,
      status: key,
      name: content.name,
      teacher_id: content.teacher_id,
    })
      .then(() => {
        message.success(`${t("edit success")}`);
        props.refresh && props.refresh();
      })
      .catch(() => {
        message.error(`${t("save failure")}`);
      });
  };

  console.log(items, "items");

  // 右键
  const handle = (e: any, id: string) => {
    setShowPopover(false);
    if (!isOrgadm) {
      return;
    }
    if (!studentList.length) {
      message.error(`${t("please bind students")}`);
      return;
    }
    e.preventDefault();
    if (isMenu) {
      setIsMenu(false);
    } else {
      // 没有课程名称和课程id禁止右键
      if (!content.name || !id) {
        return;
      }
      setIsMenu(true);
      props.handleData && props.handleData({ id });
    }
  };
  useEffect(() => {
    if (currentCeil.id !== content.id) {
      setIsMenu(false);
    }
  }, [currentCeil]);
  const id = props.data.id;

  const onMouseEnter = () => {
    setShowPopover(true);
  };
  const onMouseLeave = () => {
    setShowPopover(false);
  };

  const formItems = [
    {
      name: "student_id",
      label: t("student"),
      type: "select",
      showSearch: true,
      filterOption: (input: string, option: any) => (option?.label ?? "").includes(input),
      options: studentList.map((item) => ({ label: item.chinese_name, value: item.id })),
      required: true,
    },
    {
      name: "date",
      label: t("date"),
      needConfirm: false,
      type: "date-picker",
      format: "YYYY-MM-DD",
      required: true,
    },
    {
      name: "time",
      needConfirm: false,
      label: t("class time"),
      type: "time-range-picker",
      format: "HH:mm",
      required: true,
    },
    {
      name: "name",
      label: t("course description"),
      type: "input",
      required: true,
    },
  ];

  const [toggle, FormModal] = useFormModal({
    submit: (values) => {
      const { student_id, name, date, time } = values;
      const start_time = time[0].format("HH:mm");
      const end_time = time[1].format("HH:mm");
      return editCourseTable({
        id,
        student_id,
        date,
        start_time,
        end_time,
        name,
      }).then(() => {});
    },
    height: 250,
    title: t("course info"),
    formItems,
    refresh: props.refresh,
    formProps: {
      successTip: t("{{name}} success", { name: t("edit") }),
      initialValues: {
        name: content.name,
        student_id: content.student_id,
        date: content.date,
        time: [dayjs(content.start_time, "HH:mm"), dayjs(content.end_time, "HH:mm")],
      },
    },
  });
  console.log(content.status, "content.status");

  return (
    <>
      <FormModal />
      {contextHolder}
      <Dropdown
        placement='bottomLeft'
        menu={{ items, onClick: handleSelect }}
        trigger={["contextMenu"]}
      >
        <div
          key={content?.name}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onContextMenu={(e) => handle(e, content.id)}
          id={content.id}
          className={classNames(styles["course-ceil"])}
          style={{
            ...style,
            backgroundColor: (content.status && currentColorInfo.color) || "#fff",
          }}
          onClick={handleClick}
        >
          <Popover
            open={isShowPopover}
            placement='right'
            title={t("course info")}
            content={<CourseInfo {...content} colorInfo={currentColorInfo} />}
          >
            <span className={styles["course-name"]}>
              {content.start_time}~{content.end_time} {content.student_name} {content.name}
            </span>
          </Popover>
        </div>
      </Dropdown>
    </>
  );
};
