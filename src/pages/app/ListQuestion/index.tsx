import { CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { useAdmin } from "../../../AdminContext";
import { getQuestionsInLevel, QuestionLevelOutput } from "../../../apis/questions";
import DashboardLayout from "../../../layouts/DashboardLayout";

const ListQuestions = () => {
    const { admin } = useAdmin();
    const [data, setData] = useState<QuestionLevelOutput>();
    const [isPending, setIsPending] = useState(true);
    const routeMatch = useRouteMatch<{
        bookId: string,
        unitId: string,
        levelIndex: string
    }>()

    useEffect(() => {
        if (admin?.token) {
            getQuestionsInLevel({
                token: admin.token,
                bookId: routeMatch.params.bookId,
                unitId: routeMatch.params.unitId,
                levelIndex: Number(routeMatch.params.levelIndex)
            })
            .then(data => {
                setData(data)
            })
            .finally(() => {
                setIsPending(false)
            })
        }
    }, [])
    return (
        <React.Fragment>
            {!admin?.token && (
                <Redirect to='/login' />
            )}
            <DashboardLayout>
                <React.Fragment>
                    {isPending ? (
                        <CircularProgress />
                    ) : (
                        <Typography>ABC</Typography>
                    )}
                </React.Fragment>
            </DashboardLayout>
        </React.Fragment>
    )
}
export default React.memo(ListQuestions);