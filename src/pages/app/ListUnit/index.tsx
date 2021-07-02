import { Box } from '@material-ui/core';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { useAdmin } from '../../../AdminContext';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { getUnitsInBook } from '../../../apis/unit';
import { Unit } from '../../../types/Unit';
import ListUnitComponent from "../../../components/Unit/ListUnit";

type ListUnitParams = {
    bookId: string;
}

const ListUnit = () => {
    const { admin } = useAdmin();
    const routeMatch = useRouteMatch<ListUnitParams>();
    const [units, setUnits] = useState() as [Array<Unit>, Dispatch<SetStateAction<Unit[]>>];

    useEffect(() => {
        if (admin.token) {
            getUnitsInBook(admin.token, routeMatch.params.bookId)
                .then(data => {
                    console.log(data.units)
                    setUnits(data.units);
                })
        }
    }, [routeMatch.params.bookId, admin.token])

    return (
        <>
            {admin?.token ? (
                <DashboardLayout>
                    <React.Fragment>
                        <Helmet>
                            <title></title>
                        </Helmet>
                        {units && (
                            <Box minHeight={"100%"} py={3}>
                                <ListUnitComponent units={units}/>
                            </Box>
                        )}
                    </React.Fragment>
                </DashboardLayout>
            ) : (
                <Redirect to='/login' />
            )}
        </>
    )
}

export default React.memo(ListUnit);