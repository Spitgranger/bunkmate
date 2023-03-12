import { StreamChat } from 'stream-chat';
const chatClient = StreamChat.getInstance("asnpsp7e72h6", "djzm2aq63636qg2mjeqx9x5422hb4qu78pqepyf7fx7j7fuu44zwdgathr24zeyu", {
    timeout: 6000,
});
//Endpoint for array of chats that users in involved in, returns an array objects.
//Each object has two key value pairs, username: array of usernames involved in the channel, channel: channel cid
export const getChats = async (req, res) => {
    const streamToken = req.params.token;
    const streamId = req.params.user_id;
    //console.log(streamToken, streamId);
    const filter = { type: 'messaging', members: { $in: [streamId] } };
    const sort = [{ last_message_at: -1 }];

    const channels = await chatClient?.queryChannels(filter, sort, {
        // watch: true, // this is the default
        state: true,
    });

    const responses = await channels.map(async (channel) => {
        const response = await chatClient.queryUsers(
            { id: { $in: Object.keys(channel.state.members) } },
        );
        // console.log(response)
        let usernames = []
        response.users.forEach((element) => { usernames.push(element.name) })
        return { usernames, channel: channel.cid }
    })
    Promise.all(responses).then((response) => res.json(response).status(201))
}
