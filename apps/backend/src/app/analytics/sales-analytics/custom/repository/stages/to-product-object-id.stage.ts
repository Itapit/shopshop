import { Stage } from '../utils/types';

const HEX24 = /^[0-9a-fA-F]{24}$/;

export const toProductObjectIdStage = (): Stage => [
    {
        $addFields: {
            productIdObj: {
                $switch: {
                    branches: [
                        // already an ObjectId
                        { case: { $eq: [{ $type: '$productIdRaw' }, 'objectId'] }, then: '$productIdRaw' },

                        // string that looks like 24-hex -> convert to ObjectId
                        {
                            case: {
                                $and: [
                                    { $eq: [{ $type: '$productIdRaw' }, 'string'] },
                                    { $regexMatch: { input: '$productIdRaw', regex: HEX24 } }, // <— this line
                                ],
                            },
                            then: { $toObjectId: '$productIdRaw' },
                        },
                    ],
                    default: null,
                },
            },
        },
    },
    { $match: { productIdObj: { $ne: null } } },
];
