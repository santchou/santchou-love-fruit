import { PaginationItem } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
//import { getPosts } from "../features/api/post";
import { useSelector } from "react-redux";

export default function PaginationOutlined({ page }) {
  const { numberOfPages } = useSelector((state) => state.posts);
  //const dispatch = useDispatch();

  return (
    <Stack spacing={2}>
      <Pagination
        page={Number(page) || 1}
        count={numberOfPages}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/posts?page=${item.page}`}
            {...item}
          />
        )}
        variant="outlined"
        color="primary"
      />
    </Stack>
  );
}
