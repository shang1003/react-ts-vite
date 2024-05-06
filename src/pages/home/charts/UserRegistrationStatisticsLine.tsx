import { Chart, LineAdvance } from "bizcharts";
import { useState } from "react";
import { getUserRegistrationStatistics, UserRegistrationStatisticsType } from "~/client/user";
import { useFetch } from "~/hooks";
import { useTranslation } from "react-i18next";
export function UserRegistrationStatistics() {
  const { t } = useTranslation();
  const [data, setData] = useState<UserRegistrationStatisticsType[]>();
  useFetch(
    getUserRegistrationStatistics,
    (value) => {
      setData(value);
    },
    []
  );
  return (
    <div>
      <h1>{t("user resgistration statistics")}</h1>
      <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={data}>
        <LineAdvance
          shape='smooth'
          point
          area
          position='registration_date*registration_count'
          color='red'
        />
      </Chart>
    </div>
  );
}
