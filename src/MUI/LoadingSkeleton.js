import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function LoadingSkeleton() {
  return (
    <Stack spacing={1} sx={{ mt: 1 }}>
      <Skeleton
        sx={{ borderRadius: "0 0 15px 0", bgcolor: "#f8fbff" }}
        variant="rectangular"
        width={"100%"}
        height={80}
      />
      <Skeleton
        sx={{ borderRadius: "0 0 15px 0", bgcolor: "#f8fbff" }}
        variant="rectangular"
        width={"100%"}
        height={80}
      />
      <Skeleton
        sx={{ borderRadius: "0 0 15px 0", bgcolor: "#f8fbff" }}
        variant="rectangular"
        width={"100%"}
        height={80}
      />
      <Skeleton
        sx={{ borderRadius: "0 0 15px 0", bgcolor: "#f8fbff" }}
        variant="rectangular"
        width={"100%"}
        height={80}
      />
      <Skeleton
        sx={{ borderRadius: "0 0 15px 0", bgcolor: "#f8fbff" }}
        variant="rectangular"
        width={"100%"}
        height={80}
      />
    </Stack>
  );
}
