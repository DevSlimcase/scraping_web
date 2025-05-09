// Factory for creating bots
class BotFactory {
    static createBot(type) {
        switch (type) {
            case 'doDuong':
                return new DoDuongBot();
            case 'layDuLieu':
                return new LayDuLieuBot();
            default:
                throw new Error('Unknown bot type');
        }
    }
}

module.exports = BotFactory;