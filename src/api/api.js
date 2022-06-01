import axios from "axios";

// const expandHeaders = async () => ({
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
// });

// const baseUrl = (url: string) => `http://localhost:3002${url}`;
const baseUrl = (url) => `https://orcusnode.herokuapp.com${url}`;

const API = {
    get: (url, headers = {}, params = {}) => {
        return axios.get(url, {
            headers,
            params,
        });
    },
    put(url, headers = {}, data = {}) {
        return axios.put(url, data, {
            headers,
        });
    },
    post(url, headers = {}, data = {}) {
        return axios.post(url, data, {
            headers,
        });
    },
    delete(url, headers = {}) {
        return axios.delete(url, {
            headers,
        });
    },
};

// const instance = newAPI;
// export const API = {
//     async createCategory(title: any) {
//         return instance.post(baseUrl("/categories"), await expandHeaders(), {
//             title: title,
//         });
//     },
//     async getCategories() {
//         return instance.get(baseUrl("/categories"), await expandHeaders());
//     },
//     async createPost(title: string, category: string, text: string) {
//         return instance.post(baseUrl("/posts"), await expandHeaders(), {
//             title,
//             category,
//             text,
//         });
//     },
//     async editPost(title: string, category: string, text: string, id: string) {
//         return instance.put(baseUrl(`/posts/${id}`), await expandHeaders(), {
//             title,
//             category,
//             text,
//         });
//     },
//     async deletePost(id: string) {
//         return instance.delete(baseUrl(`/posts/${id}`), await expandHeaders());
//     },
//     async getPosts() {
//         return instance.get(baseUrl("/posts"), await expandHeaders());
//     },
//     async getShortPosts() {
//         return instance.get(baseUrl("/shortPosts"), await expandHeaders());
//     },
//     async getPost(id: string) {
//         return instance.get(baseUrl(`/main/${id}`), await expandHeaders());
//     },
//     async addPostToCategory(post: string, category: string) {
//         return instance.put(baseUrl("/categories"), await expandHeaders(), {
//             newPost: post,
//             category,
//         });
//     },
//     async login(payload: any) {
//         return instance.post(baseUrl("/auth/login"), {}, payload);
//     },
//     async registration(payload: any) {
//         return instance.post(baseUrl("/auth/registration"), {}, payload);
//     },
//     async me(username: string | null) {
//         return instance.get(
//             baseUrl(`/auth/me/${username}`),
//             await expandHeaders()
//         );
//     },
// };