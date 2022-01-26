module.exports = {
    images: {
        domains: ["links.papareact.com", "fakestoreapi.com"]
    },

    // ONLY FOR PUBLIC KEY
    env: {
        stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
        host:process.env.HOST
    }
}