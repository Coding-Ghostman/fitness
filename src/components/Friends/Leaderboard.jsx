import { useContext } from "react";
import { AuthContext } from "../auth/auth";
import React from "react";

const Leaderboard = ({ players }) => {
    // sort the players array by points (highest to lowest)
    const sortedPlayers = [...players].sort((a, b) => b.points - a.points);
    console.log(players);
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">Daily Leaderboard</h1>
            <table className="w-full border-collapse shadow-lg">
                <thead className="bg-[#082028]">
                    <tr>
                        <th className="px-6 py-2 text-left text-xl text-gray-200 font-semibold  uppercase tracking-wider">Rank</th>
                        <th className="px-6 py-2  text-left text-xl font-semibold text-gray-200 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-2  text-left ttext-xl font-semibold text-gray-200 uppercase tracking-wider">Points</th>
                    </tr>
                </thead>
                <tbody className="bg-[#082028]  text-white ">
                    {sortedPlayers.map((player, index) => (
                        <tr key={player.name}>
                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{player.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{player.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
