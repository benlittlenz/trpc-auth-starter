import { useDebouncedValue } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Datatable from "../ui/Datatable";
import MainContainer from "../ui/layout/MainLayout";
import { getPaginationParams } from "../utils/getPaginationParams";
import { trpc } from "../utils/trpc";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { query } = useRouter();
  const [debouncedQuery] = useDebouncedValue(searchQuery, 200);

  const { pageNum, sortColumn, sortDirection, rowsPerPage } =
    getPaginationParams(query);

  const { data, isLoading } = trpc.useQuery([
    "job.getAllJobs",
    {
      page: pageNum,
      sortColumn,
      sortDirection,
      rowsPerPage,
      searchQuery: debouncedQuery.trim().toLowerCase(),
    },
  ]);

  return (
    <MainContainer>
      <Datatable
        columns={columns}
        data={data?.jobs ?? []}
        loading={isLoading}
        totalRecords={data?.count ?? 0}
        selectedRecords={[]}
        setSelectedRecords={() => {}}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </MainContainer>
  );
};

export default Jobs;

const columns = [
  {
    accessor: "id",
    sortable: true,
  },
  {
    accessor: "name",
    sortable: true,
  },
  {
    accessor: "description",
    sortable: true,
  },
  {
    accessor: "status",
    sortable: true,
  },
];
