export const getInstaPost = async (res, req, next) => {
    try {
        const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${process.env.INSTAGRAM_KEY}`;
        const data = await fetch(url);
        const post = await data.json();
        return res.status(200).json({ post });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error", cause: error.message });
    }
};
//   const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${process.env.INSTAGRAM_KEY}`;
//   const data = await fetch(url);
//   const post = await data.json();
//   console.log(post);
//# sourceMappingURL=insta-controller.js.map