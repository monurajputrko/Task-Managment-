import { Skeleton } from "@mantine/core";

export function Loading() {
    const arr = new Array(20).fill(1);
  return (
    <div
          style={{
              margin: "50px",
              gap:"15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {arr.map((item,ind) => {
        return (
          <div key={ind} style={{ width: "300px" }}>
            <Skeleton height={50} circle mb="xl" />
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} width="70%" radius="xl" />
          </div>
        );
      })}
    </div>
  );
}
