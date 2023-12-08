const openai = require('openai');

const gpt = new OpenAI(process.env.OPENAI_KEY);

const gptConfig = {
    engine: 'gpt-4',
    maxTokens: 6000,
    temperature: 0.4,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
    n: 1,
    stream: false,
    stop: ['\n'],
};

module.exports = {
    getDialogue: async (prompt) => {
        try {
            const res = await gpt.complete({
                ...gptConfig,
                prompt,
            });
            console.info(res);
            return res.status(200).json(res);
        } catch (err) {
            console.error(err);
        }
    }
}
