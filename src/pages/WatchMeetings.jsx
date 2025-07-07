import React, { useEffect, useState } from "react";
import { zoomRecordings } from "../services/zoom.service";
import { FaFilter } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
const WatchMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadMeetings = async () => {
      setLoading(true);
      setError("");
      try {
        const meetingData = await zoomRecordings();
        setMeetings(meetingData);
        console.log(meetingData);
      } catch (err) {
        console.error("Zoom recordings error:", err);
        setError("Failed to load meetings.");
      } finally {
        setLoading(false);
      }
    };
    loadMeetings();
  }, []);

  if (loading) {
    return (
      <div class="flex justify-center items-center gap-2 min-h-screen min-w-screen">
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    );
  }
  const filterMeetings = meetings.filter((meeting) => {
    return meeting.topic.toLowerCase().includes(search.toLocaleLowerCase());
  });
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-red-600">
        {error}
      </div>
    );
  }
  return (
    <div className="min-h-screen min-w-screen bg-radial-[at_50%_75%] from-sky-200 via-blue-100 to-white to-90% font-ibm  text-[#333333] py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 flex justify-center items-center gap-2">
            <FaVideo className="text-[#4561bf] text-4xl" />
            Watch Meetings
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Explore recorded investor meetings and startup pitches
          </p>
          <hr className="border-t border-gray-200 mt-4 w-12 mx-auto" />
        </div>
        {/* Filters Section */}
        <div className="flex w-full mb-6 justify-end">
          <div className="flex items-center w-full max-w-sm relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1E40AF] text-base">
              <FaFilter />
            </span>
            <input
              type="text"
              placeholder="Search meetings by topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 shadow-sm rounded-lg pl-10 pr-4 py-2 w-full text-sm text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
        {/* Meeting Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-4">
          {filterMeetings.map((meeting, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 cursor-pointer"
            >
              <div className="aspect-video w-full">
                <div className="relative w-full pb-[56.25%]">
                  <iframe
                    src={meeting.share_url}
                    className="absolute top-0 left-0 w-full h-full rounded-t-xl border-0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className="p-4 bg-white">
                <p className="text-xs text-gray-500 mb-1">
                  {new Date(meeting.start_time).toLocaleString()}
                </p>
                <h3 className="text-base font-semibold text-gray-800 truncate">
                  {meeting.topic}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10 text-sm text-gray-400 italic">
          You’ve reached the end. Stay tuned for more!
        </div>{" "}
      </div>
    </div>
  );
};

export default WatchMeetings;
