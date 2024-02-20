import { UserRegistrationStatistics } from "./charts/UserRegistrationStatisticsLine";
const Home: React.FC = () => {
  return (
    <>
      <div style={{ padding: 10 }}>
        <UserRegistrationStatistics />
      </div>
    </>
  );
};
export default Home;
