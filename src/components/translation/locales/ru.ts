import { LocaleType } from '@/components/translation'

export const ru: LocaleType = {
  navBar: {
    home: 'Главная',
    create: 'Создать',
    myProfile: 'Мой профиль',
    messenger: 'Мессенджер',
    search: 'Поиск',
    statistics: 'Статистика',
    favorites: 'Избранное',
    logout: 'Выйти',
  },
  profile: {
    profilePage: {
      buttonProfileSettings: 'Настройки профиля',
      following: 'Подписки',
      followers: 'Подписчики',
      Publications: 'Публикации',
    },
    settingsProfile: {
      settingsProfileTabs: {
        generalInformation: 'Общая информация',
        devices: 'Устройства',
        accountManagement: 'Управление аккаунтом',
        myPayments: 'Мои платежи',
      },
      generalInformation: {
        errors: {
          userName: 'Имя пользователя обязательно',
          dateOfBirthMax: 'Дата рождения не может быть в будущем',
          dateOfBirthTypeError: 'Дата рождения должна быть корректной датой',
          aboutMe: 'Не может превышать 200 символов',
        },
        userName: 'Имя пользователя',
        firstName: 'Имя',
        lastName: 'Фамилия',
        dateOfBirthday: 'Дата рождения',
        city: 'Город',
        aboutMe: 'Обо мне',
        buttonSaveChanges: 'Сохранить изменения',
      },
      devices: {},
    },
  },
}
