import { useState } from "react";
import { Box, styled } from "@mui/material";
import { SimpleCardTable } from "app/components";
import CustomizePaginationTable from "../material-kit/tables/CustomizePaginationTable";
import StaticData from "../../../static/static.json";

const Container = styled("div")(({ theme }) => ({
  fontFamily: 'Inter',
    margin: "5% 5%",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        fontWeight:'600',
        lineHeight:"38.73px",
        fontSize:"32px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

  const headerRows = [
    {title:"Name", align:"left"},
    {title:"Website", align:"center"},
    {title:"Source", align:"center"},
    {title:"Creation date", align:"center"},
    {title:"Status", align:"center"},
    {title:"Select", align:"center"}
  ]

  const SocialOverview = () => {
    const [personalityData, setPersonalityData] = useState(StaticData.personalities)
    return (
      <Container>
        <Box className="breadcrumb">
            Select a personality
        </Box>
        <SimpleCardTable title="List of your personalities" add="">
            <CustomizePaginationTable data={personalityData} header={headerRows}/>
        </SimpleCardTable>
      </Container>
  );
};

export default SocialOverview;