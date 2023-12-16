import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard, SimpleCardTable } from "app/components";
import CustomizePaginationTable from "../material-kit/tables/CustomizePaginationTable";

const Container = styled("div")(({ theme }) => ({
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

const personalityArr = [
    {
      name: "john doe",
      date: "18 january, 2019",
      amount: 1000,
      status: "close",
      company: "ABC Fintech LTD.",
    },
    {
      name: "kessy bryan",
      date: "10 january, 2019",
      amount: 9000,
      status: "open",
      company: "My Fintech LTD.",
    },
    {
      name: "kessy bryan",
      date: "10 january, 2019",
      amount: 9000,
      status: "open",
      company: "My Fintech LTD.",
    },
    {
      name: "james cassegne",
      date: "8 january, 2019",
      amount: 5000,
      status: "close",
      company: "Collboy Tech LTD.",
    },
    {
      name: "lucy brown",
      date: "1 january, 2019",
      amount: 89000,
      status: "open",
      company: "ABC Fintech LTD.",
    },
    {
      name: "lucy brown",
      date: "1 january, 2019",
      amount: 89000,
      status: "open",
      company: "ABC Fintech LTD.",
    },
    {
      name: "lucy brown",
      date: "1 january, 2019",
      amount: 89000,
      status: "open",
      company: "ABC Fintech LTD.",
    },
    {
      name: "lucy brown",
      date: "1 january, 2019",
      amount: 89000,
      status: "open",
      company: "ABC Fintech LTD.",
    },
    {
      name: "lucy brown",
      date: "1 january, 2019",
      amount: 89000,
      status: "open",
      company: "ABC Fintech LTD.",
    },
  ];

  const headerRows = [
    {title:"Name", align:"left"},
    {title:"Website", align:"center"},
    {title:"Source", align:"center"},
    {title:"Creation date", align:"center"},
    {title:"Status", align:"center"},
    {title:"Select", align:"center"}
  ]

  const SocialOverview = () => {
    return (
      <Container>
        <Box className="breadcrumb">
            Select a personality
        </Box>
        <SimpleCardTable title="List of your personalities" add="true">
            <CustomizePaginationTable data={personalityArr} header={headerRows}/>
        </SimpleCardTable>
      </Container>
  );
};

export default SocialOverview;