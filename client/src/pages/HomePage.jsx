import ProfileInfo from "../components/ProfileInfo";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";
import { useCallback, useEffect, useState } from "react";

const HomePage = () => {
  const [userProfile, setuserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("recent");

  const getUserProfileandRepos = useCallback(async () => {
    setLoading(true);
    try {
      const userResponse = await fetch(
        "https://api.github.com/users/prajwal-pl"
      );
      const userProfile = await userResponse.json();
      setuserProfile(userProfile);

      const ReposRes = await fetch(userProfile.repos_url);
      const repos = await ReposRes.json();
      setRepos(repos);

      console.log("Profile:", userProfile);
      console.log("Repos:", repos);

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserProfileandRepos();
  }, [getUserProfileandRepos]);
  return (
    <div className="m-4">
      <Search />
      <SortRepos />
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}

        {repos.length > 0 && !loading && <Repos repos={repos} />}

        {loading && <Spinner />}
      </div>
    </div>
  );
};
export default HomePage;
