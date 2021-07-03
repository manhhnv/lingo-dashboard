import React, { useState } from "react";
import { CircularProgress } from '@material-ui/core';

type PageListLevelProps = {
    totalLevels: number;
}

const PageListLevel = ({ totalLevels }: PageListLevelProps) => {
    const [isPending, setIsPending] = useState(true);

    return (
        <React.Fragment>
            {isPending ? (
                <CircularProgress />
            ): null}
        </React.Fragment>
    )
}

export default PageListLevel;