import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Unit } from "../../types/Unit";
import UnitComponent from "./index";

type ListUnitProps = {
    units: Unit[];
}

const ListUnit = ({ units}: ListUnitProps) => {
    return (
        <Container maxWidth={false}>
            <Grid container spacing={5}>
                {units && units.length > 0 ? units.map(unit => {
                    return (
                        <UnitComponent unit={unit} key={unit._id} />
                    )
                }) : (
                    <Typography>
                        Không có bài học nào
                    </Typography>
                )}
            </Grid>
        </Container>
    )
}

export default React.memo(ListUnit);