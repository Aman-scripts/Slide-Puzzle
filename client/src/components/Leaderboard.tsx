import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Clock, Zap, Medal, ArrowLeft } from "lucide-react";
import type { LeaderboardEntry } from "@shared/schema";

interface LeaderboardProps {
  onClose: () => void;
}

export function Leaderboard({ onClose }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  useEffect(() => {
    fetchLeaderboard();
  }, [selectedDifficulty]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const url = selectedDifficulty === "all" 
        ? "/api/leaderboard" 
        : `/api/leaderboard?difficulty=${selectedDifficulty}`;
      const response = await fetch(url);
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const shortenAddress = (address: string | null) => {
    if (!address) return "Anonymous";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const getMedalColor = (index: number) => {
    switch (index) {
      case 0: return "text-candy-yellow";
      case 1: return "text-muted-foreground";
      case 2: return "text-candy-orange";
      default: return "text-candy-purple";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-candy-green/20 text-candy-green";
      case "medium": return "bg-candy-orange/20 text-candy-orange";
      case "hard": return "bg-candy-pink/20 text-candy-pink";
      default: return "bg-candy-blue/20 text-candy-blue";
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-candy-pink/20 via-candy-purple/20 to-candy-blue/20 dark:from-candy-pink/10 dark:via-candy-purple/10 dark:to-candy-blue/10 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-candy-yellow/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-candy-pink/30 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="max-w-4xl w-full bg-card/95 backdrop-blur-lg border-4 border-candy-purple/40 shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom duration-500">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-2 border-candy-purple/40 hover:bg-candy-purple/20"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div className="mx-auto">
              <Trophy className="w-12 h-12 text-candy-yellow mx-auto mb-2" />
            </div>
            <div className="w-24"></div>
          </div>
          <CardTitle className="text-4xl font-black bg-gradient-to-r from-candy-yellow via-candy-orange to-candy-pink bg-clip-text text-transparent">
            Leaderboard
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex gap-2 mb-6 justify-center flex-wrap">
            {["all", "easy", "medium", "hard"].map((diff) => (
              <Button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                variant={selectedDifficulty === diff ? "default" : "outline"}
                className={selectedDifficulty === diff 
                  ? "bg-gradient-to-r from-candy-pink to-candy-purple text-white" 
                  : "border-2 border-candy-purple/40 hover:bg-candy-purple/20"
                }
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </Button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-candy-purple border-t-transparent"></div>
              <p className="mt-4 text-muted-foreground">Loading leaderboard...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-lg text-muted-foreground">No entries yet. Be the first!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                    index < 3 
                      ? "bg-gradient-to-r from-candy-yellow/10 to-candy-orange/10 border-2 border-candy-yellow/40" 
                      : "bg-card/50 border-2 border-candy-purple/20"
                  }`}
                >
                  <div className={`text-3xl font-black ${getMedalColor(index)} min-w-[3rem] text-center`}>
                    {index < 3 ? <Medal className="w-8 h-8 mx-auto" /> : `#${index + 1}`}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-bold text-lg text-foreground">{entry.playerName}</div>
                    <div className="text-sm text-muted-foreground font-mono">
                      {shortenAddress(entry.walletAddress)}
                    </div>
                  </div>

                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(entry.difficulty)}`}>
                    {entry.difficulty.charAt(0).toUpperCase() + entry.difficulty.slice(1)}
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-candy-blue dark:text-candy-purple font-semibold">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(entry.timeSeconds)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-candy-pink dark:text-candy-orange font-semibold">
                      <Zap className="w-4 h-4" />
                      <span>{entry.moves}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
