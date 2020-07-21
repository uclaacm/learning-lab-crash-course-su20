import React, { useState, useEffect } from 'react';


function HookCard(){
    const [ hookCount, setHookCount ] = useState(2);

    const onClickHandler = () => {
        let newHookCount = hookCount;
        if (hookCount > 0){
            newHookCount -= 1;
        }
        setHookCount(newHookCount);
    }

    useEffect(() => {
        document.title = `we have ${hookCount} hooks left`;

        let interval = setInterval(() => {setHookCount(hookCount + 1)}, 500);

        return () => {
            clearInterval(interval)
            console.log("cleanup")
        }
    })
    return (
        <div className="hook-card">
            <p>
                the best hook of all time. you will catch at least ONE fish. or your money back.
            </p>
            <p>
                number of hooks left: {hookCount}
            </p>
            <button onClick={onClickHandler}>
              buy a hook
            </button>
          </div>
    );
}

export default HookCard;