import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "../../components/Header";
import { useGetProductsQuery } from "../../state/api";
const Product = ({
  _id,
  title,
  insight,
  intensity,
  likelihood,
  sector,
  relevance,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: "14" }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {sector}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: "1.5rem " }} color={theme.palette.secondary[400]}>
          ${Number(intensity)}
        </Typography>
        <Rating value={likelihood} readOnly />
        <Typography variant="body2">{insight}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          see more
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply left: {relevance}</Typography>
          <Typography>
            Yearly sales this Yearl: {stat.yearlySalestotal}
          </Typography>
          <Typography>
            Yearly Units sold This year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width:100px)");
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products" />
      {data || isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4,minmax(0,1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
        >
          {data.map(
            ({
              _id,
              title,
              insight,
              intensity,
              likelihood,
              sector,
              relevance,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                title={title}
                insight={insight}
                intensity={intensity}
                likelihood={likelihood}
                sector={sector}
                relevance={relevance}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
