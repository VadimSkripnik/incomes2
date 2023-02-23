import React from "react";
import { Navigate, useParams } from "react-router-dom";
import EditUserPage from "./editUserPage";
import UserPage from "./userPage";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/users";
import UsersLoader from "../../ui/hoc/usersLoader";


const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());
    
    return (
        <>
            <UsersLoader>
                {userId &&
                    (edit ? (
                        userId === currentUserId ? (
                            <EditUserPage />
                        ) : (
                          <Navigate to={`home/users/${currentUserId}/edit`} />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    ))}
            </UsersLoader>
        </>
    );
};
export default Users;



