import { Pagination } from "@mantine/core"
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { setPage } from "../../store/vacanciesSlice";

export const PaginationVacancies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const page = useSelector((state: RootState) => state.vacancies.currentPage);
  const totalPages = useSelector((state: RootState) => state.vacancies.totalPages);

  const handleChange = (n: number) => {
    dispatch(setPage(n));
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
