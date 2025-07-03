export const upcomingEventsListPromised = (search = '', type = '') => {
    let url = `/events?`;
    if (type) url += `type=${type}&`;
    if (search) url += `search=${search}&`;

    return fetch(`https://your-server-url${url}`, {
        credentials: 'include' // Cookie attach হবে
    })
        .then(res => res.json());
};
