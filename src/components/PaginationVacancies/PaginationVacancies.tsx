import { Pagination } from "@mantine/core"
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchVacancies, setPage } from "../../store/vacanciesSlice";

export const PaginationVacancies = () => {
  const dispatch = useDispatch<AppDispatch>();

  const page = useSelector((state: RootState) => state.vacancies.currentPage);
  const search = useSelector((state: RootState) => state.vacancies.searchJob);
  const city = useSelector((state: RootState) => state.vacancies.selectedCity);
  const skills = useSelector((state: RootState) => state.vacancies.keySkills);
  const totalPages = useSelector((state: RootState) => state.vacancies.totalPages);

  const handleChange = (n: number) => {
    dispatch(setPage(n));

    dispatch(
      fetchVacancies({
        search,
        area: city,
        skill: skills,
        page: n - 1
      })
    );
  };

  return (
    <Pagination
      total={totalPages}
      value={page}
      withEdges
      onChange={handleChange}
    />
  );
};