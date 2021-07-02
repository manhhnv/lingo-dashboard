import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Unit } from '../../types/Unit';

type UnitProps = {
    unit: Unit;
}

const UnitComponent = ({unit}: UnitProps) => {
    return (
        <Grid
            sm={6}
            lg={3}
            md={6}
            item
            xs={12}
        >
            <Link to='/404'>
                <Card>
                    <CardContent>
                        <Grid container={true} spacing={1}>
                            <Grid item>
                                <img
                                    src={unit.normalImage}
                                    alt='UnitImage'
                                />
                            </Grid>
                            <Grid item>
                                <Typography>
                                    {unit.name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    )
}
export default React.memo(UnitComponent);