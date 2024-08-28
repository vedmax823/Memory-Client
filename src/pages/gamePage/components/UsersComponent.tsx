import React, { FC } from 'react';

interface UsersComponentProps {
    users : User[],
    turnUser : string,
    usersCount : number
}

const UsersComponent: FC<UsersComponentProps> = ({users, turnUser, usersCount}) => {
    return (
        <div className='w-full flex flex-col items-center mt-8'>
            {
                Array.from({ length: usersCount }).map((_, index) => (
                    users[index] ? (<div 
                        className={`cursor-default m-4 rounded-lg w-10/12 flex justify-center p-2 ${turnUser == users[index].id ? "border-green-500 border-2" : "border"}`}
                        key={index}>
                        {users[index].name}
                    </div>)
                    :(
                        <div 
                            className="m-4 rounded-lg w-10/12 border-dotted border-2 flex justify-center p-2 cursor-wait"
                            key={index}>
                            waiting ...
                        </div>
                    )
                    )
                )
            }
        </div>
    );
};

export default UsersComponent;