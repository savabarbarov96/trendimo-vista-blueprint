
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface TeamMemberProps {
  name: string;
  position: string;
  bio: string;
  photoUrl: string;
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({ name, position, bio, photoUrl }) => {
  return (
    <Card className="overflow-hidden h-full">
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={photoUrl || "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=400"} 
          alt={name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-primary/70 mb-3">{position}</p>
        <p className="text-neutral-dark">{bio}</p>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
