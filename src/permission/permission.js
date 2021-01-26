
const newRole = {
    blog: {
        create: true,
        createImage: true,
        read: true,
        update: false,
        delete: false,
    },
    comment: {
        create: true,
        createNestedComment: true,
        read: true,
        update: false,
        delete: false,
    },
    follow: {
        create: true,
        read: true
    },
    category: {
        create: false,
        read: true
    },
    like: {
        create: true
    },
    report: {
        create: true,
        read: false
    },
    moderator: {
        create: true,
        approve: false,
        read: false,
        delete: false
    }
}


const allPermissions = {
    newRole
}


module.exports = allPermissions;

