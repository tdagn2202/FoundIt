import { useState, useEffect, useCallback } from 'react';
import {getAllPosts, getPost, getPostById} from '@/api/postsApi';
import { PostData } from '@/types/postProps';

interface UseFetchPostsOptions {
    postId?: number | string;
    autoFetch?: boolean;
    options?: "Lost" | "Found" | "Done" | "All";
}

export const usePost = ({ postId, autoFetch = true, options }: UseFetchPostsOptions = {}) => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [post, setPost] = useState<PostData | null>(null);
    const [myPost, setMyPost] = useState<PostData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(autoFetch);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getPost();

            const filteredPosts = data.filter((post: PostData) => post.item[0].status === options);

            setPosts(filteredPosts);


        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error fetching posts:', err);
        } finally {
            setLoading(false);
        }
    }, [options]);

    const fetchPostById = useCallback(async (id: number | string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await getPostById(id);
            setPost(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error fetching post:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchAllPosts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllPosts();
            setPosts(data); // Set to posts instead of myPost for consistency
            console.log(data);
        } catch(err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error fetching my post:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (autoFetch) {
            if (postId) {
                fetchPostById(postId);
            } else if (options === "All") {
                fetchAllPosts();
            } else {
                fetchPosts();
            }
        }
    }, [autoFetch, postId, options, fetchPosts, fetchPostById, fetchAllPosts]);

    return {
        posts,
        post,
        myPost,
        loading,
        error,
        refetch: postId ? () => fetchPostById(postId) : (options === "All" ? fetchAllPosts : fetchPosts),
        fetchPostById,
        fetchPosts,
        fetchAllPosts
    };
};