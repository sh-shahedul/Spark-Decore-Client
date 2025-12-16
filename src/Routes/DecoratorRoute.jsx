import React from 'react';
// import useAuth from '../hooks/useAuth';
// import useRole from '../hooks/useRole';
// import Loading from '../components/Loading/Loading';
// import NotAccess from '../components/NotAccess/NotAccess';
import Forbidden from '../Pages/Error/Forbidden/Forbidden';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../Component/Loading/Loading';

const DecoratorRoute = ({children}) => {
    const { loading, user } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || !user || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== "decorator") {
        return <Forbidden></Forbidden>
    }
    return children;
};

export default DecoratorRoute;