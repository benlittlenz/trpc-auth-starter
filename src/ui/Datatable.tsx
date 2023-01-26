import { Box, Grid, TextInput } from "@mantine/core";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Search } from "tabler-icons-react";
import { Button } from "./Button";

interface DatatableProps {
  data: any[];
  columns: any[];
  loading: boolean;
  totalRecords: number;
  selectedRecords: any[];
  setSelectedRecords: (selectedRecords: any[]) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

const PAGE_SIZE = 25;

export default function Datatable({
  data,
  columns,
  loading,
  totalRecords,
  selectedRecords,
  setSelectedRecords,
  searchQuery,
  setSearchQuery,
}: DatatableProps) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "name",
    direction: "asc",
  });

  useEffect(() => {
    const pageSize = router.query.page;
    setPage(pageSize ? Number(pageSize) : 1);
  }, [router]);

  const handleSortStatusChange = (status: DataTableSortStatus) => {
    setPage(1);
    setSortStatus(status);

    router.replace({
      query: {
        ...router.query,
        page: 1,
        sort: status.columnAccessor,
        direction: status.direction,
      },
    });
  };

  const handlePageChange = (pageNum: number) => {
    setPage(pageNum);
    router.replace({ query: { ...router.query, page: pageNum } });
  };

  return (
    <>
      <Grid align="center" mb="md">
        <Grid.Col span={3}>
          <TextInput
            placeholder="Search..."
            icon={<Search size={16} />}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.currentTarget.value);
            }}
          />
        </Grid.Col>
      </Grid>
      <Box sx={{ height: 600 }}>
        <DataTable
          withBorder
          borderRadius="sm"
          withColumnBorders
          verticalAlignment="top"
          fetching={loading}
          columns={columns}
          records={data}
          page={page}
          onPageChange={handlePageChange}
          totalRecords={totalRecords}
          recordsPerPage={PAGE_SIZE}
          sortStatus={sortStatus}
          onSortStatusChange={handleSortStatusChange}
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
        />
      </Box>
    </>
  );
}
