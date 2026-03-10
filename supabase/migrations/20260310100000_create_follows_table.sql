-- Create follows table for follow/unfollow social feature
CREATE TABLE follows (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  following_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now() NOT NULL,

  -- Prevent duplicate follows
  CONSTRAINT follows_unique UNIQUE (follower_id, following_id),

  -- Prevent self-follows
  CONSTRAINT no_self_follow CHECK (follower_id != following_id)
);

-- Indexes for efficient count queries
CREATE INDEX idx_follows_follower ON follows(follower_id);
CREATE INDEX idx_follows_following ON follows(following_id);

-- Enable Row Level Security
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- Anyone can read follows (needed for follower/following counts)
CREATE POLICY "Anyone can view follows"
ON follows FOR SELECT
USING (true);

-- Users can only insert follows where they are the follower
CREATE POLICY "Users can follow others"
ON follows FOR INSERT
WITH CHECK (auth.uid() = follower_id);

-- Users can only delete their own follows
CREATE POLICY "Users can unfollow"
ON follows FOR DELETE
USING (auth.uid() = follower_id);
