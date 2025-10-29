import { useState } from "react";
import { usePuzzle } from "@/lib/stores/usePuzzle";
import { useWallet } from "@/lib/hooks/useWallet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, User, Sparkles } from "lucide-react";

export function PlayerInfoForm() {
  const { setPlayerInfo, startGame, backToMenu } = usePuzzle();
  const { account, isConnecting, error, connectWallet, disconnectWallet, shortenAddress, isConnected } = useWallet();
  const [playerName, setPlayerNameInput] = useState("");

  const handleStartGame = () => {
    if (!playerName.trim()) {
      alert("Please enter your name");
      return;
    }
    
    setPlayerInfo(playerName.trim(), account || "");
    startGame();
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-candy-pink/20 via-candy-purple/20 to-candy-blue/20 dark:from-candy-pink/10 dark:via-candy-purple/10 dark:to-candy-blue/10 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-candy-yellow/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-candy-pink/30 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-candy-blue/30 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <Card className="max-w-md w-full bg-card/95 backdrop-blur-lg border-4 border-candy-purple/40 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-500">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-r from-candy-pink to-candy-purple flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-candy-pink via-candy-orange to-candy-purple bg-clip-text text-transparent">
            Player Information
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Enter your details to join the leaderboard
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="playerName" className="text-lg font-semibold text-foreground">
              Your Name
            </Label>
            <Input
              id="playerName"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerNameInput(e.target.value)}
              className="text-lg p-6 border-2 border-candy-purple/30 focus:border-candy-purple"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-lg font-semibold text-foreground">
              Wallet Connection (Optional)
            </Label>
            {!isConnected ? (
              <Button
                onClick={connectWallet}
                disabled={isConnecting}
                className="w-full bg-gradient-to-r from-candy-blue to-candy-purple hover:opacity-90 text-white font-bold py-6 text-lg rounded-xl shadow-lg"
              >
                <Wallet className="w-5 h-5 mr-2" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            ) : (
              <div className="flex gap-2">
                <div className="flex-1 bg-candy-green/20 border-2 border-candy-green/40 rounded-xl p-4 flex items-center justify-center">
                  <Wallet className="w-5 h-5 mr-2 text-candy-green" />
                  <span className="font-mono text-sm text-foreground">{shortenAddress(account)}</span>
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  className="border-2 border-candy-red/40 hover:bg-candy-red/20 text-candy-red"
                >
                  Disconnect
                </Button>
              </div>
            )}
            {error && (
              <p className="text-sm text-candy-red mt-2">{error}</p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Connect your wallet to verify your identity on the leaderboard
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={backToMenu}
              variant="outline"
              className="flex-1 border-2 border-candy-purple/40 hover:bg-candy-purple/20 text-foreground font-semibold py-6 text-lg"
            >
              Back
            </Button>
            <Button
              onClick={handleStartGame}
              disabled={!playerName.trim()}
              className="flex-1 bg-gradient-to-r from-candy-pink via-candy-orange to-candy-purple hover:opacity-90 text-white font-bold py-6 text-lg rounded-xl shadow-lg disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Game
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
