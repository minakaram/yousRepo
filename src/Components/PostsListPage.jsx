import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/apiService";


const PostsListPage = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPosts, setTotalPosts] = useState(0);
    const postsPerPage = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await api.getUsers();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await api.getPosts(selectedUser);
                setTotalPosts(data.length);
                setPosts(data.slice(0, page * postsPerPage));
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, [selectedUser, page]);

    const loadMore = () => {
        if (posts.length < totalPosts) {
            setPage((prev) => prev + 1);
        }
    };

    if (error) {
        return (
            <div className="alert alert-error">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="posts-list">
            <h1>Posts List</h1>

            <div className="mb-4">
                <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}  
                >
                    <option value="">All Users</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>{user.username}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-4">
                {posts.map((post) => {
                    const user = users.find((u) => u.id === post.userId);
                    return (
                        <div key={post.id}>
                            <h2>{user?.username || 'Unknown User'}</h2>
                            <p>Post ID: {post.id}</p>
                            <Link to={`/posts/${post.id}`}>
                                {post.title}
                            </Link>
                        </div>
                    );
                })}
            </div>

            {loading && <p>Loading...</p>}

            {!loading && posts.length < totalPosts && (
                <button
                    onClick={loadMore}
                >
                    Load More
                </button>
            )}

            <p>
                Showing {posts.length} out of {totalPosts} posts
            </p>
        </div>
    );
};

export default PostsListPage;