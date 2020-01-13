export default [
	{
		path: '/user',
		component: '../layouts/UserLayout',
		routes: [
			{
				name: 'login',
				path: '/user/login',
				component: './user/login',
			},
		],
	},
	{
		path: '/',
		component: '../layouts/SecurityLayout',
		routes: [
			{
				path: '/',
				component: '../layouts/BasicLayout',
				authority: ['admin', 'user'],
				routes: [
					{
						path: '/',
						redirect: '/welcome',
					},
					{
						path: '/welcome',
						name: 'welcome',
						icon: 'smile',
						component: './Welcome',
					},
					{
						path: '/admin',
						name: 'admin',
						icon: 'crown',
						component: './Admin',
						authority: ['admin'],
					},
					{
						path: '/func',
						icon: 'table',
						name: 'func',
						routes: [
							{
                path: '/func/func-code',
                name: 'func-code',
								component: './func/func-code'
							}
						]
					},
					{
						component: './404',
					},
				],
			},
			{
				component: './404',
			},
		],
	},

	{
		component: './404',
	},
]