import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  /**
   * Join table models
   */

  RiskUser: a.model({
    riskId: a.id().required(),
    userId: a.id().required(),

    risk: a.belongsTo('Risk', 'uuid'),
    user: a.belongsTo('User', 'uuid'),
  }),
  /**
   * Enity models
   */
  Risk: a.model({
    uuid: a.id(),
    name: a.string(),
    users: a.hasMany('User', 'uuid'),
  }),

  User: a
    .model({
      uuid: a.id(),
      name: a.string(),
      risks: a.hasMany('Risk', 'uuid'),
    })
    .authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});


