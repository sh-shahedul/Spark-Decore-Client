import React, { useState } from 'react';

// ডামি ব্যবহারকারী ডেটা (আসল ডেটা সার্ভার থেকে লোড হবে)
const DUMMY_USERS = [
    { _id: 'U101', name: 'Meem Islam', email: 'meem@client.com', role: 'User', accountStatus: 'Active' },
    { _id: 'U102', name: 'Rafiq Hassan', email: 'rafiq@client.com', role: 'User', accountStatus: 'Active' },
    { _id: 'D103', name: 'Anam Hossain', email: 'anam@styledecor.com', role: 'Decorator', accountStatus: 'Active' },
    { _id: 'D104', name: 'New Joiner', email: 'new@join.com', role: 'User', accountStatus: 'Pending' }, 
    { _id: 'A105', name: 'Admin User', email: 'admin@styledecor.com', role: 'Admin', accountStatus: 'Active' },
];

const ManageDecorators = () => {
    const [users, setUsers] = useState(DUMMY_USERS);
    
    // ভূমিকা (Role) পরিবর্তনের ডামি হ্যান্ডলার
    const handleRoleChange = (userId, newRole) => {
        // এই ফাংশনটি সার্ভারের সাথে যোগাযোগের অনুকরণ করছে
        console.log(`Frontend: Updating user ${userId} to role: ${newRole}`);
        
        // লোকাল স্টেট আপডেট করা হচ্ছে
        setUsers(prevUsers => 
            prevUsers.map(u => 
                u._id === userId 
                    ? { 
                        ...u, 
                        role: newRole, 
                        // যদি Decorator বানানো হয়, তবে Pending স্ট্যাটাস Active করে দেওয়া হলো
                        accountStatus: newRole === 'Decorator' ? 'Active' : u.accountStatus 
                      } 
                    : u
            )
        );
        // এখানে টোস্ট নোটিফিকেশন দেখাতে পারেন: 'Role changed successfully'
    };

    // অ্যাকাউন্ট স্ট্যাটাস টগল করার ডামি হ্যান্ডলার (Active/Disabled)
    const handleStatusToggle = (userId, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Disabled' : 'Active';
        console.log(`Frontend: Updating user ${userId} status to: ${newStatus}`);
        
        // লোকাল স্টেট আপডেট করা হচ্ছে
        setUsers(prevUsers => 
            prevUsers.map(u => 
                u._id === userId ? { ...u, accountStatus: newStatus } : u
            )
        );
        // এখানে টোস্ট নোটিফিকেশন দেখাতে পারেন: 'Status updated successfully'
    };

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-extrabold mb-8 text-gray-800 border-b-2 pb-2">Manage Decorators & User Roles</h2>

            {/* অনুসন্ধান ও ফিল্টার এর স্থান */}
            <div className="mb-4">
                <input type="text" placeholder="Search by Name or Email..." className="input input-bordered w-full max-w-sm" />
                {/* ভবিষ্যতে Role বা Status অনুযায়ী ফিল্টারের জন্য ড্রপডাউন এখানে যোগ করা যেতে পারে */}
            </div>

            <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
                <table className="table w-full">
                    <thead className="bg-base-200 text-gray-600">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Current Role</th>
                            <th>Status</th>
                            <th>Action (Set Role)</th>
                            <th>Action (Toggle Status)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {/* ভূমিকা ব্যাজ */}
                                    <span className={`badge ${user.role === 'Admin' ? 'badge-error' : user.role === 'Decorator' ? 'badge-info' : 'badge-ghost'} text-white`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    {/* স্ট্যাটাস ব্যাজ */}
                                    <span className={`badge ${user.accountStatus === 'Active' ? 'badge-success' : user.accountStatus === 'Pending' ? 'badge-warning' : 'badge-error'} text-white`}>
                                        {user.accountStatus}
                                    </span>
                                </td>
                                <td>
                                    {/* ভূমিকা পরিবর্তন ড্রপডাউন */}
                                    <select
                                        className="select select-bordered select-sm"
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        // নিরাপত্তা: অ্যাডমিনকে এই ড্রপডাউন থেকে পরিবর্তন করা যাবে না
                                        disabled={user.role === 'Admin'} 
                                    >
                                        <option value="User">User</option>
                                        <option value="Decorator">Decorator</option>
                                        <option value="Admin" disabled>Admin (Locked)</option> {/* অ্যাডমিন রোল পরিবর্তন ডিজেবল */}
                                    </select>
                                </td>
                                <td>
                                    {/* স্ট্যাটাস টগল বাটন */}
                                    <button 
                                        className={`btn btn-sm ${user.accountStatus === 'Active' ? 'btn-warning' : 'btn-success'} text-white`}
                                        onClick={() => handleStatusToggle(user._id, user.accountStatus)}
                                        // নিরাপত্তা: অ্যাডমিনের স্ট্যাটাস পরিবর্তন করা যাবে না
                                        disabled={user.role === 'Admin'} 
                                    >
                                        {user.accountStatus === 'Active' ? 'Disable' : 'Activate'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDecorators;