export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/manage-user'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/manage-admin'
            },
            { //quản lý kế hoạch khám bệnh của bác sỹ

                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'

            },
        ]
    },

    { //quản lý phòng khám
        name: 'common.clinic',
        menus: [
            {
                name: 'admin.manage-clinic.title', link: '/system/manage-clinic'
            },
        ]

    },

    { //quản lý chuyên khoa 
        name: 'common.specialty',
        menus: [
            {
                name: 'admin.manage-specialty.title', link: '/system/manage-specialty'
            },
        ]

    }

];

export const doctorMenu = [
    { //quản lý kế hoạch khám bệnh của bác sỹ
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
            {
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'
            }
        ]
    }

];