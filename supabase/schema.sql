-- SQL for Phase 2: Networking & Connections

-- Add status column to connections if it doesn't exist
-- This migration assumes the table already exists from Phase 1
ALTER TABLE connections 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Update RLS policies to ensure users can only see/edit their own connections
-- (Example policy, adjust based on your Supabase RLS setup)
CREATE POLICY "Users can manage their own connections" 
ON connections 
FOR ALL 
USING (auth.uid() = follower_id OR auth.uid() = following_id);

-- Phase 2: Direct Messaging
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see messages they sent or received" 
ON messages 
FOR SELECT 
USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" 
ON messages 
FOR INSERT 
WITH CHECK (auth.uid() = sender_id);
