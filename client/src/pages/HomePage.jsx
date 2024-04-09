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

  const getUserProfileandRepos = useCallback(
    async (username = "prajwal-pl") => {
      setLoading(true);
      try {
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`,
          {
            headers: {
              authorization: "token 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",
            },
          }
        );
        const userProfile = await userResponse.json();
        setuserProfile(userProfile);

        const ReposRes = await fetch(userProfile.repos_url);
        const repos = await ReposRes.json();
        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRepos(repos);
        return { userProfile, repos };
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    getUserProfileandRepos();
  }, [getUserProfileandRepos]);

  const onSearch = async (e, username) => {
    e.preventDefault();
    setLoading(true);
    setRepos([]);
    setuserProfile(null);

    const { userProfile, repos } = await getUserProfileandRepos(username);
    setuserProfile(userProfile);
    setRepos(repos);
    setLoading(false);
    setSortType("recent");
  };

  const onSort = (sortType) => {
    if (sortType === "recent") {
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortType === "stars") {
      repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortType === "forks") {
      repos.sort((a, b) => b.forks_count - a.forks_count);
    }
    setSortType(sortType);
    setRepos([...repos]);
  };

  return (
    <div className="m-4">
      <Search onSearch={onSearch} />
      {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}

        {!loading && <Repos repos={repos} />}

        {loading && <Spinner />}
      </div>
    </div>
  );
};
export default HomePage;
