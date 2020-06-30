import React from "react";

export default function Companion({companion}) {

    return (
        <div className="companion">
            Переписка с пользователем:
            {companion}
        </div>
    );
}