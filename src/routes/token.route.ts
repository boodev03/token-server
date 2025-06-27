import { Router } from 'express';
import tokenController from '../controllers/token.controller';
import {
    CreateTokenDto,
    UpdateTokenDto,
    TokenParamsDto,
    TokenSymbolParamsDto,
    TokenQueryDto
} from '../dtos/token.dto';
import { validateDto, validateMultiple } from '~/middleware';

const router = Router();

// GET /api/tokens/stats - Get token statistics
router.get('/stats', tokenController.getTokenStats);

// GET /api/tokens - Get all tokens with filtering and pagination
router.get('/',
    validateDto(TokenQueryDto, 'query'),
    tokenController.getTokens
);

// GET /api/tokens/:id - Get token by ID
router.get('/:id',
    validateDto(TokenParamsDto, 'params'),
    tokenController.getTokenById
);

// GET /api/tokens/symbol/:symbol - Get token by symbol
router.get('/symbol/:symbol',
    validateDto(TokenSymbolParamsDto, 'params'),
    tokenController.getTokenBySymbol
);

// POST /api/tokens - Create new token
router.post('/',
    validateDto(CreateTokenDto, 'body'),
    tokenController.createToken
);

// PUT /api/tokens/:id - Update token
router.put('/:id',
    validateMultiple(
        validateDto(TokenParamsDto, 'params'),
        validateDto(UpdateTokenDto, 'body')
    ),
    tokenController.updateToken
);

// DELETE /api/tokens/:id - Delete token
router.delete('/:id',
    validateDto(TokenParamsDto, 'params'),
    tokenController.deleteToken
);

export default router;