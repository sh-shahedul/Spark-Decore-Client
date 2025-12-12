import React, { useState, useEffect, useMemo } from 'react';
// import { useAuth } from '../hooks/useAuth'; // প্রমাণীকরণের জন্য আপনার কাস্টম হুক
// import axios from 'axios'; // সার্ভার থেকে ডেটা আনার জন্য

// ডামি ডেটা (আপনি সার্ভার থেকে আসল ডেটা লোড করবেন)
const DUMMY_PROJECTS = [
    { 
        _id: '201', 
        serviceName: 'Restaurant Grand Opening Decor', 
        clientName: 'Khan Food Inc.', 
        location: 'Dhanmondi, Road 27', 
        bookingDate: '2025-12-12T14:00:00Z', // 2 PM
        status: 'Planning Phase' 
    },
    { 
        _id: '202', 
        serviceName: 'Home Renovation Styling', 
        clientName: 'Tanvir Hasan', 
        location: 'Uttara, Road 5', 
        bookingDate: '2025-12-12T10:00:00Z', // 10 AM
        status: 'Materials Prepared' 
    },
    { 
        _id: '203', 
        serviceName: 'Birthday Party Setup', 
        clientName: "Riya's Family", 
        location: 'Banani Community Center', 
        bookingDate: '2025-12-12T19:00:00Z', // 7 PM
        status: 'Setup in Progress' 
    },
    // এই কাজটি অন্যদিনের, তাই ফিল্টারে বাদ যাবে (যেমন: আজকের তারিখ 2025-12-12 ধরে নেওয়া হয়েছে)
    { 
        _id: '204', 
        serviceName: 'Wedding Reception Decor', 
        clientName: 'The Royals', 
        location: 'Cox’s Bazar Resort', 
        bookingDate: '2025-12-13T11:00:00Z', 
        status: 'Assigned' 
    },
];

// স্ট্যাটাস অনুযায়ী রং সেট করার ফাংশন
const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'Completed': return 'badge-success';
        case 'Setup in Progress': return 'badge-warning';
        case 'On the Way to Venue': return 'badge-warning';
        case 'Materials Prepared': return 'badge-info';
        case 'Planning Phase': return 'badge-primary';
        default: return 'badge-neutral';
    }
};

const TodaySchedule = ({ allProjects, onStatusUpdate }) => {
    // এই কম্পোনেন্টটি MyAssignedProjects থেকে prop হিসেবে allProjects ডেটা নেবে।
    // ডামি ব্যবহারের জন্য, আমরা ডামি ডেটা ব্যবহার করছি।
    const [projects, setProjects] = useState(DUMMY_PROJECTS);
    const [loading, setLoading] = useState(false);
    
    // আজকের তারিখ হিসেবে 2025-12-12 ধরে নেওয়া হয়েছে।
    const today = new Date('2025-12-12T00:00:00Z').toDateString(); 

    // ডেটা ফিল্টারিং এবং সর্টিং লজিক (useMemo ব্যবহার করা হয়েছে)
    const todaySchedule = useMemo(() => {
        // ১. আজকের কাজগুলি ফিল্টার করা
        const filtered = projects.filter(project => {
            const projectDate = new Date(project.bookingDate).toDateString();
            return projectDate === today;
        });

        // ২. সময় অনুযায়ী সর্টিং করা (আগে শুরু হওয়া কাজগুলো প্রথমে)
        return filtered.sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate));

    }, [projects, today]);


    // স্ট্যাটাস আপডেটের জন্য ডামি হ্যান্ডলার (এটি প্রধান কম্পোনেন্ট থেকে আসা উচিত)
    const handleStatusUpdate = (projectId, newStatus) => {
        // এটি মেইন কম্পোনেন্টের `onStatusUpdate` ফাংশনকে কল করবে
        console.log(`Status update requested for ${projectId} to ${newStatus}`);
        
        // শুধু ফ্রন্টএন্ড স্টেট আপডেট করা হলো:
        setProjects(prevProjects => 
            prevProjects.map(p => 
                p._id === projectId ? { ...p, status: newStatus } : p
            )
        );
        // এখানে টোস্ট নোটিফিকেশন দেখাতে পারেন
    };

    if (loading) {
        return <div className="text-center p-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-extrabold mb-4 text-gray-800">Today's Schedule</h2>
            <p className="text-lg text-primary mb-6">
                {new Date(today).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} | Total: {todaySchedule.length} Projects
            </p>

            {todaySchedule.length === 0 ? (
                <div className="text-center p-10 bg-base-100 rounded-lg shadow-inner">
                    <p className="text-xl text-gray-500">No projects scheduled for today. Have a rest!</p>
                </div>
            ) : (
                
                // DaisyUI Timeline Component
                <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                    {todaySchedule.map((project, index) => {
                        // সময়কে স্থানীয় টাইম ফরম্যাটে রূপান্তর
                        const startTime = new Date(project.bookingDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

                        // পরবর্তী স্ট্যাটাস নির্ণয়
                        const currentIndex = ['Assigned', 'Planning Phase', 'Materials Prepared', 'On the Way to Venue', 'Setup in Progress'].indexOf(project.status);
                        const nextStatus = currentIndex >= 0 && currentIndex < 4 ? 
                                            ['Planning Phase', 'Materials Prepared', 'On the Way to Venue', 'Setup in Progress', 'Completed'][currentIndex + 1] : 
                                            (project.status === 'Completed' ? null : 'Completed');

                        return (
                            <li key={project._id}>
                                {/* টাইমলাইন মডিফায়ার (বাম বা ডান) */}
                                <div className={`timeline-${index % 2 === 0 ? 'start' : 'end'} md:text-end mb-10`}>
                                    <time className="font-mono italic text-lg text-secondary">
                                        {startTime}
                                    </time>
                                    
                                    <div className="text-lg font-bold text-gray-900 mb-2">{project.serviceName}</div>
                                    
                                    <div className="card w-full bg-base-100 shadow-xl border border-gray-200">
                                        <div className="card-body p-4">
                                            <p className="text-sm"><strong>Client:</strong> {project.clientName}</p>
                                            <p className="text-sm mb-2"><strong>Location:</strong> {project.location}</p>
                                            
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className={`badge ${getStatusBadgeClass(project.status)} text-white font-semibold`}>
                                                    {project.status}
                                                </span>
                                                
                                                {/* স্ট্যাটাস আপডেট বাটন */}
                                                {project.status !== 'Completed' && nextStatus && (
                                                    <button 
                                                        className="btn btn-xs btn-info text-white"
                                                        onClick={() => handleStatusUpdate(project._id, nextStatus)}
                                                    >
                                                        {`Mark as: ${nextStatus}`}
                                                    </button>
                                                )}
                                                
                                                {/* লোকেশন বাটন */}
                                                <a 
                                                    href={`https://maps.google.com/?q=${encodeURIComponent(project.location)}`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="btn btn-xs btn-outline btn-success"
                                                >
                                                    Map
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* টাইমলাইন মিডল ডট */}
                                <hr/>
                                <div className="timeline-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${project.status === 'Completed' ? 'text-success' : 'text-primary'}`}>
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.857a.75.75 0 00-1.214-.886l-2.736 2.735-1.12-1.12a.75.75 0 10-1.06 1.06l1.65 1.65a.75.75 0 001.06 0l3.25-3.25z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                {/* টাইমলাইন লাইন */}
                                {index < todaySchedule.length - 1 && <hr />}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default TodaySchedule;