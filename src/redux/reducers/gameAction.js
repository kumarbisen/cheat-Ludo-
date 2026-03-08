import {
	turningPoints,
	victoryStart,
	startingPoints,
	SafeSpots,
	StarSpots,
} from '$helpers/PlotData';
import {playSound} from '$helpers/SoundUtility';
import {selectCurrentPosition, selectDiceNo} from './gameSelectors';
import {
	announceWinner,
	disableTouch,
	unfreezeDice,
	updateFireworks,
	updatePlayerChance,
	updatePlayerPieceValue,
} from './gameSlice';

const delay = duration => new Promise(resolve => setTimeout(resolve, duration));

const checkWinningCriteria = pieces => {
	for (const piece of pieces) {
		if (piece.travelCount < 57) {
			return false;
		}
	}
	return true;
};

export const handleForwardThunk = (playerNo, id, pos) => {
	return async (dispatch, getState) => {
		const state = getState();
		const plottedPieces = selectCurrentPosition(state);
		const diceNo = selectDiceNo(state);

		const alpha = playerNo === 1 ? 'A' : playerNo === 2 ? 'B' : playerNo === 3 ? 'C' : 'D';

		const peicesAtPosition = plottedPieces.filter(e => e.pos === pos);
		const piece = peicesAtPosition[peicesAtPosition.findIndex(e => e.id[0] === alpha)];

		if (!piece) {
			return;
		}

		dispatch(disableTouch());

		let finalPath = piece.pos;
		const beforePlayerPiece = state.game[`player${playerNo}`].find(e => e.id === id);
		let travelCount = beforePlayerPiece?.travelCount ?? 0;

		for (let i = 0; i < diceNo; i++) {
			const updatedPosition = getState();
			const playerPiece = updatedPosition.game[`player${playerNo}`].find(e => e.id === id);
			let path = (playerPiece?.pos ?? 0) + 1;

			if (turningPoints.includes(path) && turningPoints[playerNo - 1] === path) {
				path = victoryStart[playerNo - 1];
			}

			if (path === 53) {
				path = 1;
			}

			finalPath = path;
			travelCount += 1;

			dispatch(
				updatePlayerPieceValue({
					playerNo: `player${playerNo}`,
					pieceId: playerPiece?.id,
					pos: path,
					travelCount,
				}),
			);
			playSound('pile_move');
			await delay(200);
		}

		const updatedState = getState();
		const updatedPlottedPieces = selectCurrentPosition(updatedState);
		const finalPlot = updatedPlottedPieces.filter(e => e.pos === finalPath);
		const ids = finalPlot.map(e => e.id[0]);

		const uniqueIDs = new Set(ids);
		const areDifferentIds = uniqueIDs.size > 1;

		if (SafeSpots.includes(finalPath) || StarSpots.includes(finalPath)) {
			playSound('safe_spot');
		}

		if (areDifferentIds && !SafeSpots.includes(finalPath) && !StarSpots.includes(finalPath)) {
			const enemyPiece = finalPlot.find(p => p.id[0] !== id[0]);

			if (enemyPiece) {
				const enemyId = enemyPiece.id[0];
				const no = enemyId === 'A' ? 1 : enemyId === 'B' ? 2 : enemyId === 'C' ? 3 : 4;

				const backwardPath = startingPoints[no - 1];
				let i = enemyPiece.pos;
				playSound('collide');

				while (i !== backwardPath) {
					dispatch(
						updatePlayerPieceValue({
							playerNo: `player${no}`,
							pieceId: enemyPiece.id,
							pos: i,
							travelCount: 0,
						}),
					);

					await delay(400);
					i -= 1;
					if (i === 0) {
						i = 52;
					}
				}

				dispatch(
					updatePlayerPieceValue({
						playerNo: `player${no}`,
						pieceId: enemyPiece.id,
						pos: 0,
						travelCount: 0,
					}),
				);

				dispatch(unfreezeDice());
			}
		}

		if (diceNo === 6 || travelCount === 57) {
			dispatch(updatePlayerChance({chancePlayer: playerNo}));

			if (travelCount === 57) {
				playSound('home_win');
				const finalPlayerState = getState();
				const playerAllPieces = finalPlayerState.game[`player${playerNo}`];

				if (checkWinningCriteria(playerAllPieces)) {
					dispatch(announceWinner(playerNo));
					playSound('cheer');
					return;
				}

				dispatch(updateFireworks(true));
				dispatch(unfreezeDice());
				return;
			}
		} else {
			let chancePlayer = playerNo + 1;
			if (chancePlayer > 4) {
				chancePlayer = 1;
			}
			dispatch(updatePlayerChance({chancePlayer}));
		}
	};
};
