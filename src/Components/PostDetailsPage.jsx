import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostDetailsPage = () => {
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch post and user data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
                const postData = await postResponse.json();

                const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users`);
                const usersData = await userResponse.json();

                const postUser = usersData.find((u) => u.id === postData.userId);

                setPost(postData);
                setUser(postUser);
                setTitle(postData.title);
                setBody(postData.body);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [id]);

    // Handle post update
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...post,
                    title,
                    body,
                }),
            });
            const updatedPost = await response.json();
            setPost(updatedPost);
            setEditing(false);
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle post deletion
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                    method: "DELETE",
                });
                navigate("/"); // Navigate back to posts list
            } catch (err) {
                setError(err.message);
            }
        }
    };

    // Error handling
    if (error) {
        return (
            <div className="alert alert-error">
                <p>{error}</p>
            </div>
        );
    }

    if (!post || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Post Details</h1>

            {editing ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-1">Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Body:</label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-x-2">
                        <button
                            type="submit"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div>
                    <p>Author: {user.username}</p>
                    <p>Post ID: {post.id}</p>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <div>
                        <button
                            onClick={() => setEditing(true)}
            
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostDetailsPage;
