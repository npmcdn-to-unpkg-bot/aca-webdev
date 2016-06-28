import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or '\x8f\xfdPC\xd3\xbf\x85a\xa3\x0c\xf5_\x90\xb9-J%1k\x90\x14i\x03\x9f'
    PG_CONFIG = dict(database=os.environ.get('PG_DB'), user=os.environ.get('PG_USER'), password=os.environ.get('PG_PW'), host=os.environ.get('PG_HOST'))

    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    TESTING = True

class ProductionConfig(Config):
    pass


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
