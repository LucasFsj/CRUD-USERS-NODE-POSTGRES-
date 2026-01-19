class ListUsersPaginatedService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ page = 1, limit = 10 }) {
    const safePage = Number(page) > 0 ? Number(page) : 1;
    const safeLimit = Number(limit) > 0 ? Number(limit) : 10;

    const { users, total } = await this.usersRepository.findAllPaginated({
      page: safePage,
      limit: safeLimit,
    });

    const totalPages = Math.ceil(total / safeLimit);

    return {
      data: users,
      meta: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages,
      },
    };
  }
}

module.exports = ListUsersPaginatedService;