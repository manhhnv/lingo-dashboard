import { Box, Container, Grid } from "@material-ui/core";
import Book from "../../../components/Book";
import DashboardLayout from "../../../layouts/DashboardLayout";

const Dashboard = () => {

    const content = (
        <Box
            py={3}
            minHeight={"100%"}
        >
            <Container maxWidth={false}>
                <Grid
                    container={true}
                    spacing={3}
                >
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Book
                            cover="https://s.sachmem.vn/public/bookcovers/TA1V2SHS_head.jpg"
                            bookId="tienganh1macmillan"
                            bookName="Tiếng Anh 1 Macmillan"
                            totalUnits={15}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Book
                            cover="https://s.sachmem.vn/public/bookcovers/TA1V2SHS_head.jpg"
                            bookId="tienganh1macmillan"
                            bookName="Tiếng Anh 1 Macmillan"
                            totalUnits={15}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Book
                            cover="https://s.sachmem.vn/public/bookcovers/TA1V2SHS_head.jpg"
                            bookId="tienganh1macmillan"
                            bookName="Tiếng Anh 1 Macmillan"
                            totalUnits={15}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Book
                            cover="https://s.sachmem.vn/public/bookcovers/TA1V2SHS_head.jpg"
                            bookId="tienganh1macmillan"
                            bookName="Tiếng Anh 1 Macmillan"
                            totalUnits={15}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Book
                            cover="https://s.sachmem.vn/public/bookcovers/TA1V2SHS_head.jpg"
                            bookId="tienganh1macmillan"
                            bookName="Tiếng Anh 1 Macmillan"
                            totalUnits={15}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Book
                            cover="https://s.sachmem.vn/public/bookcovers/TA1V2SHS_head.jpg"
                            bookId="tienganh1macmillan"
                            bookName="Tiếng Anh 1 Macmillan"
                            totalUnits={15}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Book
                            cover="https://s.sachmem.vn/public/bookcovers/TA1V2SHS_head.jpg"
                            bookId="tienganh1macmillan"
                            bookName="Tiếng Anh 1 Macmillan"
                            totalUnits={15}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Book
                            cover="https://s.sachmem.vn/public/bookcovers/TA1V2SHS_head.jpg"
                            bookId="tienganh1macmillan"
                            bookName="Tiếng Anh 1 Macmillan"
                            totalUnits={15}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Book
                            cover="https://s.sachmem.vn/public/bookcovers/TA1V2SHS_head.jpg"
                            bookId="tienganh1macmillan"
                            bookName="Tiếng Anh 1 Macmillan"
                            totalUnits={15}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Book
                            cover="https://s.sachmem.vn/public/bookcovers/TA1V2SHS_head.jpg"
                            bookId="tienganh1macmillan"
                            bookName="Tiếng Anh 1 Macmillan"
                            totalUnits={15}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )

    return (
        <DashboardLayout children={content}/>
    )
};

export default Dashboard;
